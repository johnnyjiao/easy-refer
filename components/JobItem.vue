<template>
    <el-row class="job-item">
        <el-col :span="4">
            <el-progress type="circle"
                         :percentage="postedDayRatio"
                         :format="dateLeft"
                         :color="getProgressColor(postedDayRatio)"/>
        </el-col>
        <el-col class="content" :span="14">
            <section class="title">
                <span>{{job.company}}</span>
                <el-divider direction="vertical"></el-divider>
                <a v-if="job.source" :href="job.source">
                    原贴
                    <i class="el-icon-top-right"></i>
                </a>
            </section>
            <section class="info">
                <span>{{job.autoRejectDay}}天默拒</span>
                <el-divider direction="vertical"></el-divider>
                <span>{{deadline}}截止</span>
            </section>
            <section class="status">
                <span>已申请 {{job.appliedCount}} / {{job.applyTotal}}</span>
            </section>
        </el-col>

        <el-col class="refer-status" :span="6">
            <div class="apply-refer">
                <el-button v-if="!isMyJob" size="small" type="primary"
                           @click="$router.push(`/refer/apply/${job.jobId}`)">
                    申请内推
                </el-button>
                <el-button v-else size="small" type="primary" plain
                           @click="$router.push('/job/edit')">
                    修改内推
                </el-button>
            </div>
            <StatusChart class="chart" v-if="job" :data-source="job.logs" :max="yMax"/>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import {Component, Prop} from 'nuxt-property-decorator'
  import CompanyImage from '@/components/CompanyImage.vue'
  import StatusChart from '@/components/StatusChart.vue'
  import {getProgressColor, getRatio} from '@/utils/math'
  import {DATETIME_FORMAT} from '@/constants/format'
  import {dateLeft} from '@/utils/date'

  @Component({
    components: {CompanyImage, StatusChart}
  })
  export default class JobItem extends Vue {
    @Prop({required: true}) job!: TJob

    getProgressColor = getProgressColor

    get yMax() {
      return this.job.logs.reduce((prev, {count}) => count > prev ? count : prev, 0)
    }

    get isMyJob() {
      return this.$auth.loggedIn && this.job.refererId === this.$auth.user.info.userId
    }

    get deadline() {
      return dayjs(this.job.deadline).format(DATETIME_FORMAT)
    }

    get postedDayRatio() {
      const {deadline, createdAt} = this.job
      const postedDays = dayjs().diff(createdAt, 'day')
      const totalDays = dayjs(deadline).diff(createdAt, 'day')
      return getRatio(postedDays, totalDays)
    }

    dateLeft() {
      return dateLeft(this.job.deadline)
    }
  }
</script>

<style scoped lang="scss">
    .job-item {
        display: flex;
        padding: 16px 0;
        border-bottom: 1px solid $border-color;

        &:last-child {
            border-bottom: none;
        }

        .content {
            .title {
                color: #303133;
                font-size: 20px;
                font-weight: bold;
                a {
                    text-decoration: none;
                    font-size: .9em;
                    color: $primary-color;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .info, .status {
                font-size: 14px;
                color: #606266;
                margin-top: 8px;
            }
        }

        .refer-status {
            text-align: right;

            .apply-refer {
                margin-bottom: 16px;
            }
        }
    }
</style>
