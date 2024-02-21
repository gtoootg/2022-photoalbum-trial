import {render} from "@testing-library/react";
import {CheckboxGroup} from "./CheckboxGroup";
import '@testing-library/jest-dom';
import React,{ useState } from "react";

const options =[
  {label:"A",value:"a"},{label:"B",value:"b"}
]

describe("CheckGroup",()=>{
  const onClickMock = jest.fn((value:string|number,isChecked:boolean)=>{
    return {value,isChecked}
  });

  it("should render",()=>{


    const {getByTestId} = render(<CheckboxGroup options={options} handleClickCheckbox={onClickMock}/>)

    const label = getByTestId("CheckboxId:0")

    expect(label).toHaveValue("A")

  })

})