import Roadmap from '../models/roadmap.model'

class RoadmapService {
  async create(data) {
    return await Roadmap.create(data)
  }

  async find(query) {
    return await Roadmap.find(query)
  }

  async findOne(query) {
    return await Roadmap.findOne(query)
  }
}

export default new RoadmapService()
