import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { Register } from "../pages/Register";
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

const insertMock = vi.fn().mockResolvedValue({ error: null });

vi.mock("../../utils/supabase", () => ({
  supabase: {
    from: () => ({
      insert: insertMock,
    }),
  },
}));

// --------------------
// tests
// --------------------

describe("Register", () => {
  test("タイトルが表示されている", () => {
    renderWithChakra(<Register />);
    expect(screen.getByText("新規名刺登録")).toBeInTheDocument();
  });

  test("必須項目を入力して登録すると / に遷移する", async () => {
    const user = userEvent.setup();
    renderWithChakra(<Register />);

    await user.type(screen.getByLabelText("user-id"), "daichi");
    await user.type(screen.getByLabelText("name"), "Daichi");
    await user.type(
      screen.getByLabelText("description"),
      "フロントエンドエンジニア"
    );
    await user.selectOptions(screen.getByLabelText("skill"), "1");

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(insertMock).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("IDがないとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    renderWithChakra(<Register />);

    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("IDは必須です")).toBeInTheDocument();
  });

  test("名前がないとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    renderWithChakra(<Register />);

    await user.type(screen.getByLabelText("user-id"), "daichi");
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("お名前は必須です")).toBeInTheDocument();
  });

  test("自己紹介がないとエラーメッセージが表示される", async () => {
    const user = userEvent.setup();
    renderWithChakra(<Register />);

    await user.type(screen.getByLabelText("user-id"), "daichi");
    await user.type(screen.getByLabelText("name"), "Daichi");
    await user.click(screen.getByRole("button", { name: "登録" }));

    expect(screen.getByText("自己紹介は必須です")).toBeInTheDocument();
  });
});
