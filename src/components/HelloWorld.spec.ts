import HelloWorld from "./HelloWorld.vue";
import { mount } from "@vue/test-utils";

test("Test HelloWorld Props", () => { 
  const wrapper = mount(HelloWorld, {
    props: {
      msg: "欢迎观临",
    },
  })
  expect(wrapper.text()).toContain("欢迎观临");
})

