module.exports = {
    apps: [
      {
        name: 'next-admin-backend', // Name of your PM2 process
        script: 'tsx', // The tsx runtime
        args: 'watch src/main.ts', // Command arguments
        interpreter: 'node', // Use the Node.js interpreter
        watch: false, // Disable PM2's watch to avoid conflicts with `tsx watch`
        env: {
          NODE_ENV: 'development', // Development environment variables
        },
        env_production: {
          NODE_ENV: 'production', // Production environment variables
        },
      },
    ],
  };
  