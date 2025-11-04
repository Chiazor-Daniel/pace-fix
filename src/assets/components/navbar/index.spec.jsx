import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import {socials} from "../../data";

import Top from "./Top";

// Test to show icons change color to golden yellow when hovered

test("test to show top-navbar contains 5 needed social icons", () => {
    // render the component
    render(<Top/>)
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(5);

    links.forEach((link, index) => {
        // get social name and assert it's part of the url
        const name = link.title;
        expect(name === socials[index].name)
        if (name !== "Whatsapp")
        expect(link.href.includes(name.toLowerCase())).toBeTruthy();

        // todo: mark - write test to show color changes on hover
        userEvent.hover(link)
    })
})

test("verify accurate date is displayed when top bar is shown", () => {
    render(<Top/>)
    // todo - mark: get divider and date when light and internet comes.
})
