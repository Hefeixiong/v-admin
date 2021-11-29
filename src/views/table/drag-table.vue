<template>
  <div class="app-container">
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" broder fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="{row}">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Data">
        <template slot-scope="{row}">
          <span>{{row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import Sortable from 'sortablejs'
import {fetchList} from '@/api/article'

export default {
  name: 'DragTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const {data} = await fetchList(this.listQuery)
      this.list = data.items
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    setSort() {
      const el = this.$ref.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el , {
        ghostClass: 'sortable-ghost',
        setData: function (dataTransfer) {
          dataTransfer.setData('Text' , '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex , 1)[0]
          this.list.splice(evt.newIndex, 0 , targetRow)

          const temIndex = this.newList.splice(evt.oldIndex , 1)[0]
          this.newList.splice(evt.newIndex , 0 ,temIndex)
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>