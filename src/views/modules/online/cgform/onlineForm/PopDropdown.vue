<template>
    <div>
        <span class="text-blue-500 text-base cursor-pointer">
            <i class="fa fa-fw fa-pencil" @click = "edit"></i>
        </span>
        <el-dropdown placement="bottom" class ="dropdown">
              <span class="text-blue-500 text-base">
                  <i class="fa fa-fw fa-ellipsis-h"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
                <template v-for = "item in dropDownItem">
                    <template v-if = "item.popover">
                        <popover-confirm @confirm = "item.action">
                            <div slot="popover-title">
                                <span>{{item.popText}}</span>
                            </div>
                            <div slot="popover-content">
                                <el-dropdown-item>{{item.label}}</el-dropdown-item>
                            </div>
                        </popover-confirm>
                    </template>
                    <template v-else>
                        <el-dropdown-item @click.native = "item.action">
                            {{item.label}}
                        </el-dropdown-item>
                    </template>
                </template>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import PopoverConfirm from '@/components/popoverConfirm'
    import {isEmpty} from '30-seconds-of-code'

    export default {
        name: "PopDropdown",
        components : {
            PopoverConfirm
        },
        props : {
            popDropdownProps : {
                type : Object
            }
        },
        data(){
            return {
                dropDownItem: [],
            }
        },
        watch : {
            popDropdownProps : {
                handler(props){
                    if(!isEmpty(props)){
                        let {isDbSynch,tableType,hascopy} = props
                        let configViewItem = ()=>{
                            return Number(hascopy) ? [
                                {
                                    label: '配置视图',
                                    icon: '',
                                    action: this.configView,
                                    popover: false,
                                },
                            ] : []
                        }
                        let dropDownItems = [
                            {
                                label: '复制视图',
                                icon: '',
                                action: this.copyView,
                                popover: false,
                            },
                            ...configViewItem(),
                            {
                                label: '移出',
                                icon: '',
                                action: this.handleRemove,
                                popover: true,
                                popText : '确定要移出吗'
                            },
                            {
                                label: '删除',
                                icon: '',
                                action: this.handleDel,
                                popover: true,
                                popText : '确定要删除吗'
                            },
                        ]

                        if(isDbSynch !== 'Y'){
                            dropDownItems = [
                                {
                                    label: '同步数据库',
                                    icon: '',
                                    action: this.syncDb,
                                    popover: false,
                                },
                                ...dropDownItems,
                            ]
                        }
                        if(isDbSynch === 'Y' && tableType !==3){
                            dropDownItems = [
                                {
                                    label: '功能测试',
                                    icon: '',
                                    action: this.functionalTest,
                                    popover: false,
                                },
                                {
                                    label: '配置地址',
                                    icon: '',
                                    action: this.addressConfig,
                                    popover: false,
                                },
                                ...dropDownItems,
                            ]
                        }
                        this.dropDownItem = dropDownItems
                    }
                },
                immediate : true
            }
        },
        methods : {
            edit(){
                this.$emit('edit')
            },
            handleRemove(){
                this.$emit('handleRemove')
            },
            handleDel(){
                this.$emit('handleDel')
            },
            functionalTest(){
                this.$emit('functionalTest')
            },
            addressConfig(){
                this.$emit('addressConfig')
            },
            syncDb(){
                this.$emit('syncDb')
            },
            copyView(){
                this.$emit('copyView')
            },
            configView(){
                this.$emit('configView')
            }
        }
    }
</script>

<style scoped>

</style>