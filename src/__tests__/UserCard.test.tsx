import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserCard } from "../components/organisms/UserCard";

describe("UserCard", () => {
  const mockProps = {
    name: "Daichi",
    description: "フロントエンドエンジニア",
    skills: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
    ],
    githubId: "daichi-github",
    qlitaId: "daichi-qiita",
    xId: "daichi-x",
  };

  test("名前が表示されている", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText("名前: Daichi")).toBeInTheDocument();
  });

  test("自己紹介が表示されている", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText("フロントエンドエンジニア")).toBeInTheDocument();
  });

  test("技術が表示されている", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  test("GitHub / Qiita / Twitter アイコンが表示されている", () => {
    render(<UserCard {...mockProps} />);

    expect(screen.getByLabelText("github")).toBeInTheDocument();
    expect(screen.getByLabelText("qiita")).toBeInTheDocument();
    expect(screen.getByLabelText("twitter")).toBeInTheDocument();
  });
});
