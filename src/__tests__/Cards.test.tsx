import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { Cards } from "../pages/Cards";
import { renderWithChakra } from "../test-utils";

// --------------------
// mocks
// --------------------

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "test-id" }),
  };
});

vi.mock("../../hooks/useUser", () => ({
  useUser: () => ({
    loading: false,
    user: {
      name: "Daichi",
      description: "フロントエンドエンジニア",
      skills: [
        { id: 1, name: "React" },
        { id: 2, name: "TypeScript" },
      ],
      githubId: "daichi-github",
      qlitaId: "daichi-qiita",
      xId: "daichi-x",
    },
  }),
}));

// --------------------
// test
// --------------------

describe("Cards", () => {
  test("戻るボタンをクリックすると / に遷移する", async () => {
    const user = userEvent.setup();
    renderWithChakra(<Cards />);

    const backButton = screen.getByRole("button", { name: "戻る" });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
