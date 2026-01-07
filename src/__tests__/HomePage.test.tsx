import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { HomePage } from "../pages/HomePage";

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
    render(<HomePage />);
    expect(screen.getByText("デジタル名刺")).toBeInTheDocument();
  });

  test("IDを入力してボタンを押すと /cards/:id に遷移する", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.type(screen.getByLabelText("ID"), "daichi");
    await user.click(screen.getByRole("button", { name: "表示" }));

    expect(mockNavigate).toHaveBeenCalledWith("/cards/daichi");
  });

  test("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(screen.getByRole("button", { name: "表示" }));

    expect(screen.getByText("IDを入力してください")).toBeInTheDocument();
  });

  test("新規登録はこちらを押すと /cards/register に遷移する", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(screen.getByText("新規登録はこちら"));

    expect(mockNavigate).toHaveBeenCalledWith("/cards/register");
  });
});
