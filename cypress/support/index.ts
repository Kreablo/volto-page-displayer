export { }

type ContentType = {
  contentType: string,
  contentId: string,
  contentTitle: string,
  contentDescription?: string,
  path?: string,
  allow_discussion?: boolean,
  transition?: string,
  bodyModifier?: <T>(body: T) => T,
  image?: boolean,
};

declare global {
  namespace Cypress {
    interface Chainable {
      autologin: () => void;
      createContent: (c: ContentType) => void;
      addNewBlock: (s: string) => void;
    }
  }
}
