import React from "react";
import { AlbumPostGeneralInformationTextGroup } from "./AlbumPostGeneralInformationTextGroup";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MgButton } from "../../../../../../components/button/MgButton";

const mockAlbumPostData = {
  title: "Mock Title",
  description: "Mock Description",
};
jest.mock("../../../../hooks/use-get-album-post.hooks", () => ({
  useGetAlbumPostData: () => ({ albumPost: mockAlbumPostData }),
}));

describe("AlbumPostGeneralInformationTextGroup", () => {
  it("", () => {
    const { getByText } = render(<AlbumPostGeneralInformationTextGroup />);

    const text = getByText("Mock Title");

    expect(text).toBeInTheDocument();
  });
});
