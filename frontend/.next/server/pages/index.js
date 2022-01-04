"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home),\n/* harmony export */   \"getStaticProps\": () => (/* binding */ getStaticProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var postcss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! postcss */ \"postcss\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @apollo/client */ \"@apollo/client\");\n/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([postcss__WEBPACK_IMPORTED_MODULE_2__]);\npostcss__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction Home({ posts  }) {\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n        __source: {\n            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n            lineNumber: 7,\n            columnNumber: 5\n        },\n        __self: this,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                __source: {\n                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                    lineNumber: 8,\n                    columnNumber: 7\n                },\n                __self: this,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"title\", {\n                        __source: {\n                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                            lineNumber: 9,\n                            columnNumber: 9\n                        },\n                        __self: this,\n                        children: \"Logly\"\n                    }),\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"meta\", {\n                        name: \"description\",\n                        content: \"Next generation museum tours\",\n                        __source: {\n                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                            lineNumber: 10,\n                            columnNumber: 9\n                        },\n                        __self: this\n                    }),\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/favicon.ico\",\n                        __source: {\n                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                            lineNumber: 11,\n                            columnNumber: 9\n                        },\n                        __self: this\n                    })\n                ]\n            }),\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"main\", {\n                __source: {\n                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                    lineNumber: 14,\n                    columnNumber: 7\n                },\n                __self: this,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"header\", {\n                        className: \"container flex justify-between px-4 py-4\",\n                        __source: {\n                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                            lineNumber: 15,\n                            columnNumber: 9\n                        },\n                        __self: this,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"img\", {\n                                src: \"logly.png\",\n                                className: \"w-1/3\",\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 16,\n                                    columnNumber: 11\n                                },\n                                __self: this\n                            }),\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n                                className: \"space-y-2\",\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 17,\n                                    columnNumber: 11\n                                },\n                                __self: this,\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n                                        className: \"w-8 h-0.5 bg-gray-600\",\n                                        __source: {\n                                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                            lineNumber: 19,\n                                            columnNumber: 13\n                                        },\n                                        __self: this\n                                    }),\n                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n                                        className: \"w-8 h-0.5 bg-gray-600\",\n                                        __source: {\n                                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                            lineNumber: 20,\n                                            columnNumber: 13\n                                        },\n                                        __self: this\n                                    }),\n                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n                                        className: \"w-8 h-0.5 bg-gray-600\",\n                                        __source: {\n                                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                            lineNumber: 21,\n                                            columnNumber: 13\n                                        },\n                                        __self: this\n                                    })\n                                ]\n                            })\n                        ]\n                    }),\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"h1\", {\n                        className: \"text-3xl text-center font-bold\",\n                        __source: {\n                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                            lineNumber: 24,\n                            columnNumber: 9\n                        },\n                        __self: this,\n                        children: [\n                            \"Welcome to \",\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"br\", {\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 25,\n                                    columnNumber: 22\n                                },\n                                __self: this\n                            }),\n                            \" LOGLY\"\n                        ]\n                    }),\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"section\", {\n                        className: \"intro mt-4\",\n                        __source: {\n                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                            lineNumber: 28,\n                            columnNumber: 9\n                        },\n                        __self: this,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"img\", {\n                                src: \"stock-museum-1.jpg\",\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 29,\n                                    columnNumber: 11\n                                },\n                                __self: this\n                            }),\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"h3\", {\n                                className: \"px-4\",\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 30,\n                                    columnNumber: 11\n                                },\n                                __self: this,\n                                children: \"Brief intro Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aut impedit, minus doloribus cumque nulla eum molestiae eligendi obcaecati. Ratione magnam repudiandae dolorum minima aspernatur nostrum sit iusto rem iure.\"\n                            })\n                        ]\n                    }),\n                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"section\", {\n                        className: \"experiences mt-10\",\n                        __source: {\n                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                            lineNumber: 38,\n                            columnNumber: 9\n                        },\n                        __self: this,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"h3\", {\n                                className: \"pb-3\",\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 39,\n                                    columnNumber: 11\n                                },\n                                __self: this,\n                                children: \"Pick an Experience\"\n                            }),\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"hr\", {\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 40,\n                                    columnNumber: 11\n                                },\n                                __self: this\n                            }),\n                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n                                className: \"experience-slider mt-5\",\n                                __source: {\n                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                    lineNumber: 41,\n                                    columnNumber: 11\n                                },\n                                __self: this,\n                                children: postcss__WEBPACK_IMPORTED_MODULE_2__[\"default\"].map((post)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n                                        className: \"experience-post\",\n                                        __source: {\n                                            fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                            lineNumber: 43,\n                                            columnNumber: 15\n                                        },\n                                        __self: this,\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"img\", {\n                                                src: \"stock-museum-2.jpg\",\n                                                alt: \"\",\n                                                __source: {\n                                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                                    lineNumber: 44,\n                                                    columnNumber: 17\n                                                },\n                                                __self: this\n                                            }),\n                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"strong\", {\n                                                __source: {\n                                                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                                                    lineNumber: 45,\n                                                    columnNumber: 17\n                                                },\n                                                __self: this,\n                                                children: post.title\n                                            })\n                                        ]\n                                    }, post.id)\n                                )\n                            })\n                        ]\n                    })\n                ]\n            }),\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"footer\", {\n                __source: {\n                    fileName: \"/Users/trentonkennedy/Desktop/development/logly/frontend/pages/index.js\",\n                    lineNumber: 52,\n                    columnNumber: 7\n                },\n                __self: this\n            })\n        ]\n    }));\n};\nasync function getStaticProps() {\n    const client = new _apollo_client__WEBPACK_IMPORTED_MODULE_3__.ApolloClient({\n        uri: `https://admin.tovech.com/api/graphql`,\n        cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_3__.InMemoryCache()\n    });\n    const { data  } = await client.query({\n        query: _apollo_client__WEBPACK_IMPORTED_MODULE_3__.gql`\n      query Posts {\n        title\n      }\n    `\n    });\n    return {\n        props: {\n            posts: data.posts\n        }\n    };\n}\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRCO0FBQ0M7QUFDb0M7QUFFbEQsUUFBUSxDQUFDSyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkMsTUFBTSx1RUFDSEMsQ0FBRzs7Ozs7Ozs7a0ZBQ0RQLGtEQUFJOzs7Ozs7Ozt5RkFDRlEsQ0FBSzs7Ozs7OztrQ0FBQyxDQUFLOzt5RkFDWEMsQ0FBSTt3QkFBQ0MsSUFBSSxFQUFDLENBQWE7d0JBQUNDLE9BQU8sRUFBQyxDQUE4Qjs7Ozs7Ozs7eUZBQzlEQyxDQUFJO3dCQUFDQyxHQUFHLEVBQUMsQ0FBTTt3QkFBQ0MsSUFBSSxFQUFDLENBQWM7Ozs7Ozs7Ozs7a0ZBR3JDQyxDQUFJOzs7Ozs7OzswRkFDRkMsQ0FBTTt3QkFBQ0MsU0FBUyxFQUFDLENBQTBDOzs7Ozs7OztpR0FDekRDLENBQUc7Z0NBQUNDLEdBQUcsRUFBQyxDQUFXO2dDQUFDRixTQUFTLEVBQUMsQ0FBTzs7Ozs7Ozs7a0dBQ3JDVixDQUFHO2dDQUFDVSxTQUFTLEVBQUMsQ0FBVzs7Ozs7Ozs7eUdBRXZCVixDQUFHO3dDQUFDVSxTQUFTLEVBQUMsQ0FBdUI7Ozs7Ozs7O3lHQUNyQ1YsQ0FBRzt3Q0FBQ1UsU0FBUyxFQUFDLENBQXVCOzs7Ozs7Ozt5R0FDckNWLENBQUc7d0NBQUNVLFNBQVMsRUFBQyxDQUF1Qjs7Ozs7Ozs7Ozs7OzBGQUd6Q0csQ0FBRTt3QkFBQ0gsU0FBUyxFQUFDLENBQWdDOzs7Ozs7Ozs0QkFBQyxDQUNsQztpR0FBQ0ksQ0FBRTs7Ozs7Ozs7NEJBQUcsQ0FDbkI7OzswRkFFQ0MsQ0FBTzt3QkFBQ0wsU0FBUyxFQUFDLENBQVk7Ozs7Ozs7O2lHQUM1QkMsQ0FBRztnQ0FBQ0MsR0FBRyxFQUFDLENBQW9COzs7Ozs7OztpR0FDNUJJLENBQUU7Z0NBQUNOLFNBQVMsRUFBQyxDQUFNOzs7Ozs7OzBDQUFDLENBS3JCOzs7OzBGQUdESyxDQUFPO3dCQUFDTCxTQUFTLEVBQUMsQ0FBbUI7Ozs7Ozs7O2lHQUNuQ00sQ0FBRTtnQ0FBQ04sU0FBUyxFQUFDLENBQU07Ozs7Ozs7MENBQUMsQ0FBa0I7O2lHQUN0Q08sQ0FBRTs7Ozs7Ozs7aUdBQ0ZqQixDQUFHO2dDQUFDVSxTQUFTLEVBQUMsQ0FBd0I7Ozs7Ozs7MENBQ3BDaEIsbURBQVcsRUFBRXlCLElBQUkseUVBQ2ZuQixDQUFHO3dDQUFlVSxTQUFTLEVBQUMsQ0FBaUI7Ozs7Ozs7O2lIQUMzQ0MsQ0FBRztnREFBQ0MsR0FBRyxFQUFDLENBQW9CO2dEQUFDUSxHQUFHLEVBQUMsQ0FBRTs7Ozs7Ozs7aUhBQ25DQyxDQUFNOzs7Ozs7OzBEQUFFRixJQUFJLENBQUNsQixLQUFLOzs7dUNBRlhrQixJQUFJLENBQUNHLEVBQUU7Ozs7Ozs7aUZBU3hCQyxDQUFNOzs7Ozs7Ozs7O0FBR2IsQ0FBQztBQUVNLGVBQWVDLGNBQWMsR0FBRyxDQUFDO0lBQ3RDLEtBQUssQ0FBQ0MsTUFBTSxHQUFHLEdBQUcsQ0FBQzlCLHdEQUFZLENBQUMsQ0FBQztRQUMvQitCLEdBQUcsR0FBRyxvQ0FBb0M7UUFDMUNDLEtBQUssRUFBRSxHQUFHLENBQUMvQix5REFBYTtJQUMxQixDQUFDO0lBRUQsS0FBSyxDQUFDLENBQUMsQ0FBQ2dDLElBQUksRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDSCxNQUFNLENBQUNJLEtBQUssQ0FBQyxDQUFDO1FBQ25DQSxLQUFLLEVBQUVoQywrQ0FBRyxDQUFDO0lBS2IsQ0FBQztJQUNELE1BQU0sQ0FBQyxDQUFDOzs7O0lBQThCLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xvZ2x5LXVpLy4vcGFnZXMvaW5kZXguanM/YmVlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgcG9zdGNzcyBmcm9tIFwicG9zdGNzc1wiO1xuaW1wb3J0IHsgQXBvbGxvQ2xpZW50LCBJbk1lbW9yeUNhY2hlLCBncWwgfSBmcm9tIFwiQGFwb2xsby9jbGllbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSh7IHBvc3RzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5Mb2dseTwvdGl0bGU+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJOZXh0IGdlbmVyYXRpb24gbXVzZXVtIHRvdXJzXCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8bWFpbj5cbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJjb250YWluZXIgZmxleCBqdXN0aWZ5LWJldHdlZW4gcHgtNCBweS00XCI+XG4gICAgICAgICAgPGltZyBzcmM9XCJsb2dseS5wbmdcIiBjbGFzc05hbWU9XCJ3LTEvM1wiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIHsvKiBodHRwczovL3d3dy5ub3RpbWVkYWQuZGV2L3Jlc3BvbnNpdmUtbmF2YmFyLXRhaWx3aW5kLXJlYWN0LyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtMC41IGJnLWdyYXktNjAwXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTAuNSBiZy1ncmF5LTYwMFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC0wLjUgYmctZ3JheS02MDBcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTN4bCB0ZXh0LWNlbnRlciBmb250LWJvbGRcIj5cbiAgICAgICAgICBXZWxjb21lIHRvIDxiciAvPiBMT0dMWVxuICAgICAgICA8L2gxPlxuXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImludHJvIG10LTRcIj5cbiAgICAgICAgICA8aW1nIHNyYz1cInN0b2NrLW11c2V1bS0xLmpwZ1wiIC8+XG4gICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInB4LTRcIj5cbiAgICAgICAgICAgIEJyaWVmIGludHJvIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuXG4gICAgICAgICAgICBOb2JpcyBhdXQgaW1wZWRpdCwgbWludXMgZG9sb3JpYnVzIGN1bXF1ZSBudWxsYSBldW0gbW9sZXN0aWFlXG4gICAgICAgICAgICBlbGlnZW5kaSBvYmNhZWNhdGkuIFJhdGlvbmUgbWFnbmFtIHJlcHVkaWFuZGFlIGRvbG9ydW0gbWluaW1hXG4gICAgICAgICAgICBhc3Blcm5hdHVyIG5vc3RydW0gc2l0IGl1c3RvIHJlbSBpdXJlLlxuICAgICAgICAgIDwvaDM+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJleHBlcmllbmNlcyBtdC0xMFwiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJwYi0zXCI+UGljayBhbiBFeHBlcmllbmNlPC9oMz5cbiAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4cGVyaWVuY2Utc2xpZGVyIG10LTVcIj5cbiAgICAgICAgICAgIHtwb3N0Y3NzLm1hcCgocG9zdCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17cG9zdC5pZH0gY2xhc3NOYW1lPVwiZXhwZXJpZW5jZS1wb3N0XCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzdG9jay1tdXNldW0tMi5qcGdcIiBhbHQ9XCJcIiAvPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+e3Bvc3QudGl0bGV9PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvbWFpbj5cblxuICAgICAgPGZvb3Rlcj48L2Zvb3Rlcj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKCkge1xuICBjb25zdCBjbGllbnQgPSBuZXcgQXBvbGxvQ2xpZW50KHtcbiAgICB1cmk6IGBodHRwczovL2FkbWluLnRvdmVjaC5jb20vYXBpL2dyYXBocWxgLFxuICAgIGNhY2hlOiBuZXcgSW5NZW1vcnlDYWNoZSgpLFxuICB9KTtcblxuICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGNsaWVudC5xdWVyeSh7XG4gICAgcXVlcnk6IGdxbGBcbiAgICAgIHF1ZXJ5IFBvc3RzIHtcbiAgICAgICAgdGl0bGVcbiAgICAgIH1cbiAgICBgLFxuICB9KTtcbiAgcmV0dXJuIHsgcHJvcHM6IHsgcG9zdHM6IGRhdGEucG9zdHMgfSB9O1xufVxuIl0sIm5hbWVzIjpbIkhlYWQiLCJwb3N0Y3NzIiwiQXBvbGxvQ2xpZW50IiwiSW5NZW1vcnlDYWNoZSIsImdxbCIsIkhvbWUiLCJwb3N0cyIsImRpdiIsInRpdGxlIiwibWV0YSIsIm5hbWUiLCJjb250ZW50IiwibGluayIsInJlbCIsImhyZWYiLCJtYWluIiwiaGVhZGVyIiwiY2xhc3NOYW1lIiwiaW1nIiwic3JjIiwiaDEiLCJiciIsInNlY3Rpb24iLCJoMyIsImhyIiwibWFwIiwicG9zdCIsImFsdCIsInN0cm9uZyIsImlkIiwiZm9vdGVyIiwiZ2V0U3RhdGljUHJvcHMiLCJjbGllbnQiLCJ1cmkiLCJjYWNoZSIsImRhdGEiLCJxdWVyeSIsInByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "@apollo/client":
/*!*********************************!*\
  !*** external "@apollo/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "postcss":
/*!**************************!*\
  !*** external "postcss" ***!
  \**************************/
/***/ ((module) => {

module.exports = import("postcss");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();