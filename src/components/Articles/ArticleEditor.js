import React from "react";
import ErrorsList from "../ErrorsList/ErrorsList";
import userService from "../../services/userService";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Form, Input, Button } from "antd";

import { store } from "../../store";
import actionCreators from "../../actionCreators";
const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
};

const formSingleItemLayout = {
    wrapperCol: { span: 24, offset: 0 }
};

const mapStateToProps = (state) => ({
    ...state.editor
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (payload) => dispatch(actionCreators.doEditorLoaded(payload)),
    onUnload: () => dispatch(actionCreators.doEditorUnloaded()),
    onUpdateField: (key, value) =>
        dispatch(actionCreators.doUpdateFieldEditor(key, value)),
    onSubmit: (payload, slug) => {
        dispatch(actionCreators.doArticleSubmitted(payload));
        store.dispatch(push(`/`)); //article/${slug}
    },
    onRedirect: () => dispatch(actionCreators.doRedirect())
});

class ArticleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        const updateFieldEvent = (key) => (e) =>
            this.props.onUpdateField(key, e.target.value);
        this.changeTitle = updateFieldEvent("title");
        this.changeDescription = updateFieldEvent("description");
        this.changeBody = updateFieldEvent("body");
        this.changeTagInput = updateFieldEvent("tagInput");
        this.isLoading = true;

        this.submitForm = () => {
            const article = {
                title: this.props.title,
                description: this.props.description,
                body: this.props.body,
                tagList: this.props.tagInput.split(",")
            };

            const slug = { slug: this.props.articleSlug };
            const promise = this.props.articleSlug
                ? userService.articles.update(Object.assign(article, slug))
                : userService.articles.create(article);

            this.props.onSubmit(promise, this.props.articleSlug);
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("id", prevProps.match.params.id);
        if (prevProps.match.params.id !== prevProps.match.params.id) {
            if (prevProps.match.params.id) {
                this.props.onUnload();
                return this.props.onLoad(
                    userService.articles.get(this.props.match.params.id)
                );
            }
            this.props.onLoad(null);
        }
        this.isLoading = false;
    }

    componentDidMount() {
        if (this.id) {
            this.isLoading = true;
            return this.props.onLoad(userService.articles.get(this.id));
        }
        this.isLoading = false;
        this.props.onLoad(null);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }


    render() {
        const { errors } = this.props;
        const initialValues = {
            title: this.props?.title,
            body: this.props?.body,
            description: this.props?.description,
            tags: this.props?.tagList
        };

        return this.isLoading ? (
            "loading..."
        ) : (
            <div className="editor-page">
                <div className="container page">
                    <div className="">
                        <div className="">
                            <ErrorsList errors={errors}></ErrorsList>
                            <Form
                                {...formItemLayout}
                                initialValues={initialValues}
                                onFinish={this.submitForm}
                            >
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    placeholder="Article Title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input article title"
                                        }
                                    ]}
                                >
                                    <Input onChange={this.changeTitle} />
                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                    placeholder="Short description"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input article description"
                                        }
                                    ]}
                                >
                                    <Input onChange={this.changeDescription} />
                                </Form.Item>
                                <Form.Item
                                    name="body"
                                    label="Article Text"
                                    placeholder="article text"
                                >
                                    <Input.TextArea onChange={this.changeBody} />
                                </Form.Item>
                                <Form.Item name="tags" label="Tags" placeholder="Enter tags">
                                    <Input onChange={this.changeTagInput} />
                                </Form.Item>
                                <Form.Item {...formSingleItemLayout}>
                                    <Button
                                        className="editor-form__btn"
                                        type="primary"
                                        htmlType="submit"
                                        disabled={this.props.inProgress}
                                    >
                                        Submit Article
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
