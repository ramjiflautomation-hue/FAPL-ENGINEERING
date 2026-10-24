/* Netlify compatibility bridge for the original Apps Script portal. */
(function () {
  "use strict";

  var API_PATH = "/api";

  function apiError(message, status) {
    var e = new Error(message || "API request failed.");
    if (status != null) e.status = status;
    return e;
  }

  function createRunner() {
    var state = {
      success: null,
      failure: null,
      userObject: null
    };

    var proxy = new Proxy({}, {
      get: function (_target, property) {
        if (property === "then") return undefined;

        if (property === "withSuccessHandler") {
          return function (fn) {
            state.success = fn;
            return proxy;
          };
        }

        if (property === "withFailureHandler") {
          return function (fn) {
            state.failure = fn;
            return proxy;
          };
        }

        if (property === "withUserObject") {
          return function (obj) {
            state.userObject = obj;
            return proxy;
          };
        }

        return function () {
          var fn = String(property);
          var args = Array.prototype.slice.call(arguments);

          fetch(API_PATH, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fn: fn, args: args })
          })
            .then(function (response) {
              return response.text().then(function (text) {
                var payload = null;
                try {
                  payload = text ? JSON.parse(text) : null;
                } catch (e) {
                  throw apiError(
                    "Invalid API response from Netlify.",
                    response.status
                  );
                }

                if (!response.ok) {
                  throw apiError(
                    payload && payload.message
                      ? payload.message
                      : "API request failed (" + response.status + ").",
                    response.status
                  );
                }

                return payload;
              });
            })
            .then(function (result) {
              if (typeof state.success === "function") {
                state.success(result, state.userObject);
              }
            })
            .catch(function (error) {
              if (typeof state.failure === "function") {
                state.failure(error, state.userObject);
              } else {
                console.error("Material Request API error:", error);
              }
            });

          return createRunner();
        };
      }
    });

    return proxy;
  }

  window.google = window.google || {};
  window.google.script = window.google.script || {};
  window.google.script.run = createRunner();
})();
