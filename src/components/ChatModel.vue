<template>
    <div class="chat-container">
        <a-row>
            <a-col v-show='modelStatus' :span='24' class='model-container'>
                <a-row class='model' type='flex' align='top'>
                    <a-col :span='24' class="title-container handle-container">
                        <a-row type='flex' justify='center' align='middle'>
                            <a-col :span='20' class='title'>聊天室(当前在线人数：{{onlineCount}})</a-col>
                            <a-col :span='4'>
                                <a-button icon='close' @click='launchChat(false)'></a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span='24' class="chat-msg-container" ref='modelScroll' v-bar="{ preventParentScroll: true, scrollThrottle: 30}">
                        <div class="model-scroll">
                            <div class="msg-list">
                                <div v-for='(item, index) in chatList' :key='index' class='msg-container'>
                                    <a-row type='flex' align='top' justify='start' class='other' v-if='!item.isOwn'>
                                        <a-col class='name' :span='4'>{{item.nickname || '匿名用户'}}</a-col>
                                        <a-col class='msg' :span='14'>{{item.msg}}</a-col>
                                    </a-row>
                                    <a-row v-else class='self'>
                                        <a-col class='msg' push='10' :span='14'>{{item.msg}}</a-col>
                                    </a-row>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span='24' class="submit-container handle-container">
                        <a-form
                            style='marginTop:10px;'
                            layout="inline"
                            :form='form'
                            @submit='handleSubmit'
                        >
                            <a-form-item
                                :validate-status="msgError() ? 'error' : ''"
                                :help="msgError() || ''"
                            >
                                <a-input v-decorator="[
                                'msg',
                                {rules: [{
                                    required: true,
                                    message: 'cannot submit no message'
                                }]}
                                ]"
                                placeholder='请输入内容...'>

                                </a-input>
                            </a-form-item>
                            <a-form-item>
                                <a-button :disabled='hasError(form.getFieldError("msg"))' html-type="submit">发送</a-button>
                            </a-form-item>
                        </a-form>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span='24' class='btn-container'>
                <a-badge v-bind='badgeConfig' :count='29'>
                    <a-button @click='launchChat' class='chat-toggle-model-btn' type="primary" shape="circle">
                        <a-icon type="message" class='star-svg' theme='filled' :style='{fontSize: "30px"}' />
                    </a-button>
                </a-badge>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    export default {
        data() {
            const fakeMsgData = [
                {
                    nickname: 'test',
                    msg: 'hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },{
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: false
                },
                {
                    nickname: 'test',
                    msg: 'hihihi',
                    isOwn: true
                },
            ]
            return {
                chatList: [],
                onlineCount: 0,
                badgeConfig: {
                    overflowCount: 99,
                    showZero: false,
                    offset: [-4, 4],
                },
                modelStatus: false,
                hasError:(fieldsError) => {
                    return typeof fieldsError === 'object'
                },
                ioInstance: null,
                ioId: ''
            }
        },
        beforeCreate() {
            this.form = this.$form.createForm(this)
        },
        created() {
            this.ioInstance = this.$io('/chat', {
                path: '/chat'
            })
            this.ioInstance.on('connect', () => {
                this.ioId = this.ioInstance.id
                console.log('#connect');
                // this.ioInstance.emit('online')
            });
            this.ioInstance.on('chat', (data) => {
                console.log('chat' ,data)
                data['isOwn'] = this.ioId == data.from
                this.chatList.push(data)
            })
            this.ioInstance.on('online', ({count}) => {
                console.log(count)
                this.onlineCount = count
            })
            
            
        },
        mounted() {
            this.$nextTick(() => {
                // To disabled submit button at the beginning.
                this.form.validateFields();
            })
            this.$vuebar.refreshScrollbar(this.$refs.modelScroll, {
                scrollThrottle: 30,
                preventParentScroll: true
            })
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                const that = this
                this.form.validateFields((err, values = {msg: ''}) => {
                    if (!err) {
                        const msg = Object.assign({}, {from: this.ioId}, values)
                        this.ioInstance.emit('chat', msg)
                        this.form.resetFields('msg')
                        this.$nextTick(() => {
                            // To disabled submit button at the beginning.
                            this.form.validateFields();
                        })
                    }
                });
            },
            msgError () {
                const { getFieldError, isFieldTouched } = this.form;
                return isFieldTouched('msg') && getFieldError('msg');
            },
            launchChat(chatStatus = true) {
                if(!chatStatus) {
                    return this.modelStatus = false
                }
                this.modelStatus = true
                console.log(this.$ioInstance)
            }
        }
    }
</script>
<style lang="less" scoped>
    .chat-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 999;
        width: 360px;
        background-color: transparent;
        .model-container {
            margin-bottom: 10px;
            // box-shadow: 0px 0px 2px 2px #eee;
            .model {
                overflow: hidden;
                height: 540px;
                border-radius: 10px;
                flex-flow: column nowrap;
                justify-content: space-around;
                align-items: center;
                .title-container {
                    background-color: rgb(78, 140, 255);
                    .title {
                        text-align: center;
                    }
                }
                .handle-container {
                    height: 60px;
                    line-height: 60px;
                }
                .submit-container {
                    background-color: rgb(244, 247, 249);
                }
                .chat-msg-container {
                    background-color: #fff;
                    flex: 1;
                    border: 1px solid #eee;
                    .model-scroll {
                        .msg-list {
                            padding: 10px 0;
                        }
                    }
                    .msg-container {
                        margin-bottom: 10px;
                        .msg {
                            border-radius: 4px;
                            word-break: break-all;
                            text-align: left;
                            padding: 6px 10px;
                        }
                        .other {
                            .name {

                            }
                            .msg {
                                background-color: rgb(234, 234, 234);
                            }
                        }
                        .self {
                            .msg {
                                color: #fff;
                                background-color: rgb(78, 140, 255);
                            }
                        }
                    }
                }
            }
        }
        .btn-container {
            text-align: right;
            .chat-toggle-model-btn {
                width: 60px;
                height: 60px;
            }
        }
    }
</style>