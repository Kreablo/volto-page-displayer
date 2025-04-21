const SLATE_SELECTOR = '.content-area .slate-editor [contenteditable=true]';

type pageData = {
  id: string,
  content: string,
};

const save = () => {
  cy.get('#toolbar-save').click();
}

const mountPageDisplayerTo = (page: pageData) => {
  cy.get('.ui.basic.icon.button.block-add-button.new-add-block').click();
  cy.get('.blocks-chooser.new-add-block .ui.input input[type=text]').type('Page Displayer');
  cy.get('.button.pageDisplayer').click();
  cy.get('input[type=url][name=url]').type(page.id);
}

const mkPage = (id: string, content: string) => {
  return {
    id,
    content,
  }
};


const waitFor = (page: pageData) => {
  return cy.wait(page.content);
};

const visitPage = (page: pageData) => {
  cy.visit(page.id);
  return waitFor(page);
};

const editPage = (page: pageData) => {
  return cy.visit(`${page.id}/edit`);
};


const visitAndLink = (pA: pageData, pB: pageData) => {
  editPage(pA);
  mountPageDisplayerTo(pB);
}

context('Tests for Page Displayer Block', () => {
  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'document-a',
      contentTitle: 'Test Document A',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'document-b',
      contentTitle: 'Test Document B',
    });
    cy.visit('document-a/edit');
    cy.get(SLATE_SELECTOR).type('Hello from A{enter}');
    save();
    cy.visit('document-b/edit');
    cy.get(SLATE_SELECTOR).type('Hello from B{enter}');
    save();

    cy.intercept('GET', '/**/document-a*').as('contentA');
    cy.intercept('GET', '/**/document-b*').as('contentB');
  });
  const pageA = mkPage('/document-a', '@contentA');
  const pageB = mkPage('/document-b', '@contentB');


  it('00 It is possible to create a Page Displayer and link to other page.', () => {

    visitAndLink(pageA, pageB);

    cy.get('.pageDisplayer').contains('Hello from B')

    save();

    cy.get('.page-displayer-view').contains('Hello from B');
    cy.get('.page-displayer-view .loop-detected').should('not.exist');
    waitFor(pageA);
    // cy.screenshot();
  });

  it('01 Creating a Page Displayer and linking it to itself should yield a warning.', () => {

    visitAndLink(pageA, pageA);

    save();

    cy.get('.page-displayer-view .loop-detected').should('exist');
    // cy.screenshot();
  });

  it('02 Creating two Page Displayers on separate pages and linking them to each other should yield a warning.', () => {

    visitAndLink(pageA, pageB);
    save();

    visitAndLink(pageB, pageA);
    save();

    visitPage(pageB);

    cy.get('.page-displayer-view .loop-detected').should('exist');
    // cy.screenshot();
  });

  it('03 Title can be shown or hidden.', () => {
    visitAndLink(pageA, pageB);
    waitFor(pageB);

    cy.get('.page-displayer-view').click();

    cy.get('#field-showTitle').should('not.be.checked');
    cy.get('.page-displayer-view .documentFirstHeading').should('not.exist');

    // cy.screenshot();

    cy.get('#sidebar-properties .ui.checkbox').click();
    cy.get('#field-showTitle').should('be.checked');
    cy.get('.page-displayer-view .documentFirstHeading').should('exist');
    // cy.screenshot();

    save();

    cy.get('.page-displayer-view .documentFirstHeading').should('exist');

    waitFor(pageA);
    // cy.screenshot();
  });
});

const addListingLocation = (loc) => {
  cy.get('.sidebar-container .tabs-wrapper .menu .item')
    .contains('Block')
    .click();
  cy.get('.querystring-widget .fields').contains('Add criteria').click()
    .type('Location{enter}');
  cy.get('.querystring-widget .fields>.field .input').click()
    .type(`${loc}{enter}`);
};

const selectVariation = () => {
  cy.get('#field-variation').click().type('Page Displayer{enter}');
};

context('Tests for Page Displayer as a Listing variation', () => {

  const pageRoot = mkPage('/root', '@contentRoot');
  const pageA = mkPage('/root/document-a', '@contentA');
  const pageB = mkPage('/root/document-b', '@contentB');

  beforeEach(() => {
    cy.viewport('macbook-16');
    cy.autologin();

    cy.createContent({
      contentType: 'Document',
      contentId: 'root',
      contentTitle: 'Root document',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'document-a',
      contentTitle: 'Test Document A',
      path: 'root',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'document-b',
      contentTitle: 'Test Document B',
      path: 'root',
    });

    cy.intercept('GET', '/**/document-a*').as('contentA');
    cy.intercept('GET', '/**/document-b*').as('contentB');
    cy.intercept('GET', '/**/root*').as('contentRoot');

    editPage(pageA);
    cy.get(SLATE_SELECTOR).type('From A{enter}');
    save();
    editPage(pageB)
    cy.get(SLATE_SELECTOR).type('From B{enter}');
    save();
  });

  it('00 The Page Displayer Listing variation displays the content of both A and B.', () => {
    cy.viewport('macbook-16');
    editPage(pageRoot);
    cy.addNewBlock('Listing');

    addListingLocation(pageRoot.id);
    selectVariation();
    save();

    visitPage(pageRoot);

    cy.get('.pageDisplayer').contains('From A');
    cy.get('.pageDisplayer').contains('From B');

    cy.get('.loop-detected').should('not.exist');

    // cy.screenshot();
  });

  it('01 Listing variation displays the content of A and warns for loop on B ', () => {
    cy.viewport('macbook-16');
    editPage(pageRoot);
    cy.addNewBlock('Listing');

    addListingLocation(pageRoot.id);
    selectVariation();
    save();

    visitAndLink(pageB, pageRoot);
    save();

    visitPage(pageRoot);

    cy.get('.pageDisplayer').contains('From A');
    cy.get('.pageDisplayer').contains('From B');

    cy.get('.loop-detected').should('exist');

    // cy.screenshot();
  });

});
