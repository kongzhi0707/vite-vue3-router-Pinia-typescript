
import HelloTsx from "./HelloTsx";
import { mount } from "@vue/test-utils";

test("Test HelloWorld Props", () => { 
  const wrapper = mount(HelloTsx, {});

  expect(wrapper.text()).toContain("this is tsx");
})