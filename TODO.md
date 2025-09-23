# TODO - Authentication and CEP Integration

## Completed Steps

- [x] Update `auth.service.ts` to include real `signIn`, `signUp`, `confirmSignUp`, and `resendSignUpCode` methods using AWS Amplify
- [x] Create `register.component.ts` with registration form and email confirmation functionality
- [x] Add registration route in `app.routes.ts`
- [x] Update `login.component.ts` to use real authentication instead of simulation
- [x] Update `auth-guard.ts` to use `isAuthenticatedAsync` for proper authentication checks
- [x] Update login component template to include link to registration
- [x] Fix AWS Amplify signUp error by handling email attribute correctly
- [x] Update login and register components to use email as username
- [x] Implement email confirmation flow in registration process
- [x] Fix ngIf directive error by exporting Produto interface in catalogo.component.ts
- [x] Ensure register link in login component is properly configured
- [x] Create `cep.service.ts` to integrate with Viacep API for CEP address lookup
- [x] Update `checkout.component.ts` to include CEP search functionality
- [x] Update `checkout.component.html` to add CEP input with search button
- [x] Update `checkout.component.scss` to style the CEP input group and button
- [x] Add `provideHttpClient` to `app.config.ts` for HTTP requests

## Next Steps

- [ ] Test the registration and login flow with email confirmation
- [ ] Ensure AWS Amplify is properly configured for authentication
- [ ] Handle any remaining edge cases in the confirmation process
- [ ] Test the CEP address lookup functionality
