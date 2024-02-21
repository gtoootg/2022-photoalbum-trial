import { fireEvent, render } from "@testing-library/react";
import { CheckboxGroup, CheckBoxWithSubComponent } from "./CheckboxGroup";
import "@testing-library/jest-dom";
import React, { useState } from "react";

const options = [
  { label: "A", value: "a" },
  { label: "B", value: "b" },
];

describe("CheckGroup", () => {
  const onClickMock = jest.fn((value: string | number, isChecked: boolean) => {
    return { value, isChecked };
  });

  it("should render 2 Checkbox", () => {
    const { getByTestId } = render(
      <CheckboxGroup options={options} handleClickCheckbox={onClickMock} />
    );
    const parent = getByTestId("CheckboxGroup");
    expect(parent.children.length).toBe(2);
  });

  it("should render correct label", () => {
    const { getByTestId } = render(
      <CheckboxGroup options={options} handleClickCheckbox={onClickMock} />
    );
    const checkbox = getByTestId("0");
    expect(checkbox).toHaveTextContent("A");
  });

  it("should fire click event", () => {
    const { getByLabelText } = render(
      <CheckboxGroup options={options} handleClickCheckbox={onClickMock} />
    );
    const checkbox = getByLabelText("A");

    fireEvent.click(checkbox);

    expect(onClickMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalledWith("a", true);
  });
});

describe("CheckBoxWithSubComponent", () => {
  it("should render subcomponent when click checkbox", () => {
    const { getByText, getByLabelText } = render(
      <CheckBoxWithSubComponent
        subComponent={<>sub component</>}
        option={options[0]}
      />
    );
    const checkbox = getByLabelText("A");

    fireEvent.click(checkbox);

    const checkedCheckboxSubcomponent = getByText("sub component");
    expect(checkedCheckboxSubcomponent).toBeInTheDocument();
  });
});
