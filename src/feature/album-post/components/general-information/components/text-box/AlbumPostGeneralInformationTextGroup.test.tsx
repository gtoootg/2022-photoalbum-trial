import React from "react";
import { AlbumPostGeneralInformationTextGroup } from "./AlbumPostGeneralInformationTextGroup";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useGetAlbumPostData } from "../../../../hooks/use-get-album-post.hooks";

const mockAlbumPostData = {
  id: 0,
  title: "Mock Title",
  description: "Mock Description",
  country: "111",
  lat: 0,
  lng: 0,
  imageIds: [0],
  categoryIds: {},
  userId: 0,
};

jest.mock("../../../../hooks/use-get-album-post.hooks");
const mockUseGetAlbumPostData = jest.mocked(useGetAlbumPostData);

describe("AlbumPostGeneralInformationTextGroup", () => {
  beforeEach(() => {
    mockUseGetAlbumPostData.mockReset();
  });

  it("should show correct title and description", () => {
    mockUseGetAlbumPostData.mockReturnValue({
      albumPost: mockAlbumPostData,
      imageSrcs: [],
    });
    const { getByText } = render(<AlbumPostGeneralInformationTextGroup />);

    const text = getByText("Mock Title");
    const description = getByText("Mock Description");

    expect(text).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
