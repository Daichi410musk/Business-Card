import { render, screen } from "@testing-library/react";
import { SampleComponent } from "../components/sampleComponent";

describe("SampleComponent", () => {
  test("Hello World!　が表示される", () => {
    render(<SampleComponent />);
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});
