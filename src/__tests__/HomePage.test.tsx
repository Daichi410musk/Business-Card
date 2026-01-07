import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { HomePage } from "../pages/HomePage";
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
  };
});

// --------------------
// test
// --------------------

describe("HomePage", () => {
  test("タイトルが表示されている", () => {
    renderWithChakra(<HomePage />);
    expect(screen.getByText("デジタル名刺")).toBeInTheDocument();
  });

  test("IDを入力してボタンを押すと /cards/:id に遷移する", async () => {
    const user = userEvent.setup();
    renderWithChakra(<HomePage />);

    await user.type(screen.getByPlaceholderText("ユーザーIDを入力"), "daichi");
    await user.click(screen.getByRole("button", { name: "名刺を見る" }));

    expect(mockNavigate).toHaveBeenCalledWith("/cards/daichi");
  });

  test("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    renderWithChakra(<HomePage />);

    await user.click(screen.getByRole("button", { name: "名刺を見る" }));

    expect(screen.getByText("IDを入力してください")).toBeInTheDocument();
  });
});
