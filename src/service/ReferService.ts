import {AxiosResponse} from 'axios'
import service from '@/service/config'

const ReferService = {
  async getReferList(role: TViewRole, page = 1, limit = 10): Promise<AxiosResponse<IReferList>> {
    return await service.get('/refers', {
      params: {role, page, limit}
    })
  },
  async getReferById(referId: string): Promise<AxiosResponse<IRefer>> {
    return await service.get(`/refers/${referId}`)
  },
  async editRefer(referId: string, referForm: TReferForm): Promise<AxiosResponse> {
    return await service.post(`/refers/${referId}`, {
      referForm
    })
  },
  async applyRefer(jobId: string, referForm: TReferForm): Promise<AxiosResponse> {
    return await service.post('/refers', {
      jobId, referForm
    })
  }
}

export default ReferService
