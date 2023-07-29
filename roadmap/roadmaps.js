const fs = require('fs')
const YAML = require('yaml')
const path = require('path')

const roadmaps = {
  'Project Euler': {
    yml: 'project-euler.yml',
    js: 'project-euler.js'
  }
}

const loadRoadmap = file =>
  new Promise((resolve, reject) => {
    fs.readFile(
      path.join(process.cwd(), 'roadmap', file),
      'utf-8',
      (err, data) => {
        if (err) return reject(err)
        try {
          const res = YAML.parse(data)
          return resolve(res)
        } catch (err) {
          return reject(err)
        }
      }
    )
  })

const main = async () => {
  for (let roadmap of Object.values(roadmaps)) {
    const parsed = await loadRoadmap(roadmap.yml)
    fs.writeFile(
      path.join(process.cwd(), 'roadmap', roadmap.js),
      `export default ${JSON.stringify(parsed)}`,
      err => {
        if (err) throw new Error(err)
      }
    )
  }
}

if (require.main === module) main() // Load roadmaps from YML to JS

module.exports = {
  roadmaps,
  loadRoadmap
}
