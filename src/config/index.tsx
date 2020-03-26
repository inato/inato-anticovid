import config from "./config.json";

export default config as {
  algolia: { applicationId: string; publicApiKey: string; index: string };
  ga: { id: string | null };
  emailSubscribeHookUrl: string;
  feedbackUrl: string;
  TableauUrl: string;
};
