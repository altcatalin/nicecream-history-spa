import axios from "axios";
import React from "react";
import EventSource from "eventsourcemock";
import Enzyme, {mount} from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import History from "../../components/history";

Enzyme.configure({ 
    adapter: new Adapter() 
});

Object.defineProperty(window, 'EventSource', {
    value: EventSource,
});

jest.mock('axios');
axios.get.mockResolvedValue({ data: []});

describe("History", () => {
    let wrapper;

    beforeAll(async () => {
        wrapper = mount(<History />);
        const instance = wrapper.instance();
        await instance.componentDidMount();
    });

    it("should display channels", async () => {        
        expect(wrapper.html()).toEqual(expect.stringContaining("name=\"channel\""));
    });
});