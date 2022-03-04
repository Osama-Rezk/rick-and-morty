describe('Testing User Journey', () => {
	it('should go to profile page from home page And name should be in footer', () => {
		cy.visit('/');

		cy.findByText(/loading.../i).should('exist');

		cy.wait(3000);

		cy.findByTestId('home-pagination').should('exist');

		//go to profile page
		cy.findByRole('link', { name: /Morty Smith/i }).click();

		//name should be in footer
		cy.findByRole('link', { name: /Morty Smith/i }).should('exist');

		cy.findByLabelText('Search characters').type('Rick Sanchez').type('{enter}');

		//auto complete should be visible
		cy.findByTestId('auto-complete').should('exist');

		//go to search page
		cy.findByTestId('search-statics').should('exist');
	});
});
