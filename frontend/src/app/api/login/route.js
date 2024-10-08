// src/app/api/login/route.js

// fake api login
export async function POST(request) {
  const { email, password } = await request.json();

  // Fake user data (hardcoded)
  const mockUser = {
    email: "test@user.com",
    password: "password123",
  };

  // Check if email and password match the fake user
  if (email === mockUser.email && password === mockUser.password) {
    // Simulate successful login response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        token: "fake-jwt-token",
        user: { email: mockUser.email },
      }),
      { status: 200 }
    );
  } else {
    // Simulate failed login response
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid email or password",
      }),
      { status: 401 }
    );
  }
}
