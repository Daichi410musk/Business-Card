import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

const system = createSystem(defaultConfig);

export const renderWithChakra = (ui: ReactElement) => {
  return render(<ChakraProvider value={system}>{ui}</ChakraProvider>);
};
