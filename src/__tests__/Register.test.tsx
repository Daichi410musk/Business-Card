import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { Register } from "../pages/Register";

// --------------------
// mocks
// --------------------

const mockNavigate = vi.fn();

// react-router
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// supabase
const insertMock = vi.fn().mockResolvedValue({ error: null });

vi.mock("../../utils/supabase", () => ({
  supabase: {
    from: () => ({
      insert: insertMock,
    }),
  },
}));

// --------------------
// test
// --------------------

describe("Register", () => {
  test("タイトルが表示されている", () => {
    render(<Register />);
    expect(screen.getByText("名刺登録")).toBeInTheDocument();
  });

  test("全項目入力して登録すると / に遷移する", async () => {
    const user = userEvent.setup();
    render(<Register />);

    await user.type(screen.getByLabelText("ID"), "daichi");
    await user.type(screen.getByLabelText("名前"), "Daichi");
    await user.type(
      screen.getByLabelText("自己紹介"),
      "フロントエンドエンジニア"
    );

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(insertMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("IDがないとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    render(<Register />);

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("IDは必須です")).toBeInTheDocument();
  });

  test("名前がないとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    render(<Register />);

    await user.type(screen.getByLabelText("ID"), "daichi");
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("名前は必須です")).toBeInTheDocument();
  });

  test("自己紹介がないとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    render(<Register />);

    await user.type(screen.getByLabelText("ID"), "daichi");
    await user.type(screen.getByLabelText("名前"), "Daichi");
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("自己紹介は必須です")).toBeInTheDocument();
  });

  test("オプション未入力でも登録できる", async () => {
    const user = userEvent.setup();
    render(<Register />);

    await user.type(screen.getByLabelText("ID"), "daichi");
    await user.type(screen.getByLabelText("名前"), "Daichi");
    await user.type(screen.getByLabelText("自己紹介"), "エンジニア");

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(insertMock).toHaveBeenCalled();
  });
});
