import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { optimismSepolia, polygonAmoy} from "wagmi/chains";

export const rainbowkitConfig = getDefaultConfig({
  appName: "Rootstock Rainbowkit",
  projectId: "73bfede1812912189a63f8b354eac692",
  chains: [optimismSepolia,polygonAmoy],
});
