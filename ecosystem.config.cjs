module.exports = {
  apps: [
    {
      name: "nuxt-app",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      ignore_watch: ["node_modules", "tmp", ".git"],
      watch_delay: 1000,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: "~/.ssh/gcp-lesson-120",
      // SSH user
      user: "napha",
      // SSH host
      host: ["34.143.142.233"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      // GIT remote/branch
      ref: "origin/main",
      // GIT remote
      repo: "git@github.com:napha-404/nuxt3-pm2-gcp.git",
      // path in the server
      path: "/var/www/apps/demo-nuxt",
      // Pre-setup command or path to a script on your local machine
      // "pre-setup": "apt-get install git ; ls -la",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      // "post-setup": "ls -la",
      // pre-deploy action
      "pre-deploy-local": "echo 'This is a local executed command'",
      // post-deploy action
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.cjs --env production DEBUG='pw:api'",
    },
  },
};
