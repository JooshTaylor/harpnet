// import React from "react";
// import Button from "./Button";
// import renderer from "react-test-renderer";

// MUST IMPORT REACT-TEST-RENDERER TO WORK (SNAPSHOT TEST)
// test("Button goes className is suffixed with --inactive when active is false", () => {
//   const component = renderer.create(<Button className="follow" />);

//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   tree.props.active = false;
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   tree.props.active = true;
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
