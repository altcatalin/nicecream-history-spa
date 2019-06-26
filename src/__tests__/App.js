import React from "react";
import { MemoryRouter } from "react-router-dom";
import Enzyme, {mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import App from "../App";

Enzyme.configure({ adapter: new Adapter() })

describe("App", () => {
    it("renders without crashing", async () => {
        const wrapper = mount(<MemoryRouter><App /></MemoryRouter>);
        expect(wrapper.exists()).toBe(true);
    });
});