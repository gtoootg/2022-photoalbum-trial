import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";

import '@testing-library/jest-dom';
import {MgButton} from "./MgButton";

describe("CommonButton", () => {
  test("renders button with text when link is not provided", () => {
    const onClickMock = jest.fn();
    const { getByTestId, getByText } = render(
      <MgButton variant="contained" onClick={onClickMock} text="Click me" />
    );

    const button = getByTestId("commonButton");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);

    const buttonText = getByText("Click me");
    expect(buttonText).toBeInTheDocument();
  });

  test("renders link with text when link is provided", () => {
    const link = "https://example.com";
    const { getByTestId, getByText } = render(
      <MgButton variant="contained" text="Click me" link={link} />
    );

    const button = getByTestId("commonButton");
    expect(button).toBeInTheDocument();

    const linkElement = getByText("Click me");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement.getAttribute("href")).toBe(link);
  });
});