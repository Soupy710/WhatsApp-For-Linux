const path = require('path');

module.exports = {
  packagerConfig: {
    icon: path.resolve(__dirname, 'src/256x256.icns')
  },      
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "cool"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    }
  ]
}
