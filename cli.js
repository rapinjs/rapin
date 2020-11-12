#!/usr/bin/env node
const [,, ...args] = process.argv

const { exec, spawnSync, spawn } = require('child_process');
const fs = require('fs')
const path = require('path')
const isDev = args.find(value => (value === '--watch'))
const newArgs = args.filter(value => (value !== '--watch' && value !== 'start')).join(' ')
var rimraf = require("rimraf");
const bootstrap = () => {
  const compiler = spawn('npx', ['tsc', '-w', '-p', '.'])
  // compiler.on('message', (message) => {
  //   console.log(message);
  // })
  spawn('node', ['lib/index.js', ...newArgs], {env: {
    NODE_ENV: !isDev ? 'production' : 'development'
  }, stdio: 'inherit'})
}

if (fs.existsSync(path.resolve(process.cwd(), './lib'))) {
  // rimraf(path.resolve(process.cwd(), './lib'), () => {
    bootstrap()
  // })
} else {
  bootstrap()
}