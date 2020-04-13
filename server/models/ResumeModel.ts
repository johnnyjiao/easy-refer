import {DataTypes} from 'sequelize'
import {AllowNull, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table, Unique} from 'sequelize-typescript'
import UserModel from './UserModel'
import ReferModel from './ReferModel'

@Table
class ResumeModel extends Model<ResumeModel> {
  // 字段
  @Unique
  @AllowNull(false)
  @PrimaryKey
  @Column(DataTypes.UUID)
  public resumeId!: string

  @Column(DataTypes.STRING)
  public name!: string | null

  @Column(DataTypes.STRING)
  public url!: string | null

  // 外键
  @ForeignKey(() => UserModel)
  public readonly refereeId!: string

  @ForeignKey(() => ReferModel)
  public readonly referId!: string

  // 关系
  @BelongsTo(() => UserModel)
  public readonly referee?: UserModel

  @BelongsTo(() => ReferModel)
  public readonly refer?: ReferModel
}

export default ResumeModel
