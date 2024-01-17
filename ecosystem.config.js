module.exports = {
  apps: [
    {
      name: "nuxt-app",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: "/home/napha/.ssh/gcp-lesson-120.pub",
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
      path: "/var/www/apps/nuxt-app",
      // Pre-setup command or path to a script on your local machine
      "pre-setup": "apt-get install git ; ls -la",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      "post-setup": "ls -la",
      // pre-deploy action
      "pre-deploy-local": "echo 'This is a local executed command'",
      // post-deploy action
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
      deploy: "pm2 deploy ecosystem.config.js production",
    },
  },
};
