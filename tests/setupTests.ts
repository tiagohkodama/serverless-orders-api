// Silence console.error during tests to avoid noisy output when we intentionally
// trigger errors to verify error handling. Tests can still assert that console
// was called by spying inside a specific test if needed.

beforeAll(() => {
  // Replace console.error with a no-op mock for all tests
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  // Restore the original implementation after the test run
  ;(console.error as jest.Mock).mockRestore()
})
