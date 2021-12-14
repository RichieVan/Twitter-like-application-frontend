import { makeAutoObservable, toJS } from "mobx";
import PostService from '../services/PostService.js';

export default class PostStore {
    feedPostsList = [];
    currentCommentsList = [];
    currentPostId = null;
    firstLoaded;
    lastLoaded;
    canLoadMore;
    syncing = false;
    currentList = {
        type : null
    };
    feedType = localStorage.getItem('feedType') || 'all';
    canChangeFeedType = false;

    constructor() {
        makeAutoObservable(this, [], {deep : true});
    }

    setSyncing (state) {
        this.syncing = state;
    }

    setCurrentList (state) {
        this.currentList = state;
    }

    setCanLoadMore (state) {
        this.canLoadMore = state;
    }
    
    setFeedPostsList (state) {
        if (state === null) {
            this.lastLoaded = null;
            this.firstLoaded = null;
            this.feedPostsList = null;
        } else {
            if (state.length > 0) {
                this.lastLoaded = state[0];
                this.firstLoaded = state[state.length - 1];
                this.feedPostsList = state;
            } else {
                this.lastLoaded = null;
                this.firstLoaded = null;
                this.feedPostsList = [];
            }
        }
    }

    deleteFromFeedPostsList (id) {
        this.feedPostsList = toJS(this.feedPostsList).filter(value => value.id !== parseInt(id))
    }

    setCurrentCommentsList (comments, clear = false) {
        if (clear) this.currentCommentsList = [];
        else this.currentCommentsList = comments.concat(this.currentCommentsList);
    }
    
    deleteFromCurrentCommentsList (id) {
        this.currentCommentsList = toJS(this.currentCommentsList).filter(value => value.id !== parseInt(id))
    }

    setCurrentPostId (value) {
        this.currentPostId = value;
    }

    setFeedType (value) {
        this.setFeedPostsList([]);
        this.feedType = value;
        localStorage.setItem('feedType', value);
    }

    setCanChangeFeedType (value) {
        this.canChangeFeedType = value;
    }

    async createPost (data) {
        try {
            this.setSyncing(true);
            const fromPost = toJS(this.firstLoaded);
            const response = await PostService.create({
                ...data, 
                params : {
                    fromTimestamp : fromPost?.createdAt.timestamp || new Date(0),
                    fromId : fromPost?.id || 0,
                    forSubs : (this.feedType == 'subs')
                }
            });
            
            this.setFeedPostsList(response);
            this.setSyncing(false);
        } catch (e) {
            console.log(e);
            this.setSyncing(false);
            throw Error(e.response.data.message);
        }
    }

    async createComment (data) {
        try {
            const fromPost = toJS(this.currentCommentsList)[0];
            const response = await PostService.createComment({
                ...data, 
                from : {
                    fromTimestamp : fromPost?.createdAt.timestamp || 0,
                    fromId : fromPost?.id || 0
                }
            });
            this.setCurrentCommentsList(response.data);
        } catch (e) {
            console.log(e);
            throw Error(e.response.data.message);
        }
    }

    async fetchPosts () {
        try {
            console.log(this.feedType == 'subs');
            const {data} = await PostService.getFeed(
                {
                    forSubs : (this.feedType == 'subs')
                }
            );
            
            this.setCanLoadMore(data.canLoadMore)
            return data.posts.length > 0 ? data.posts : null;
        } catch (e) {
            console.log(e);
            //throw Error(e.response.data.message);
        }
    }

    async loadMorePosts () {
        try {
            const fromPost = toJS(this.firstLoaded);
            const {data} = await PostService.loadMore(
                {
                    fromTimestamp : fromPost?.createdAt.timestamp || 0,
                    fromId : fromPost?.id || 0,
                    forSubs : (this.feedType == 'subs')
                }
            );
            this.setFeedPostsList(toJS(this.feedPostsList).concat(data.posts))
            return data.canLoadMore;
        } catch (e) {
            console.log(e);
        }
    }

    async syncPosts (force = false) {
        if (this.feedPostsList.length > 0) {
            try {
                this.setSyncing(true);
                const fromPost = toJS(this.firstLoaded);
                let {data} = await PostService.syncPosts(
                    {
                        fromTimestamp : fromPost?.createdAt.timestamp || 0,
                        fromId : fromPost?.id || 0,
                        forSubs : (this.feedType == 'subs')
                    }
                ); 
                
                this.setSyncing(false);
                if (force) this.setFeedPostsList(data);
                else return data;
            } catch (e) {
                this.setSyncing(false);
                console.log(e);
            }
        }
    }

    async fetchComments (postId) {
        try {
            const response = await PostService.getComments(postId);
            this.setCurrentCommentsList(response.data);
            return this.currentCommentsList;
        } catch (e) {
            console.log(e);
            //throw Error(e.response.data.message);
        }
    }

    async loadNewPosts () {
        try {
            const response = await PostService.loadNewPosts(toJS(this.currentCommentsList)[0]?.id || 0);
            this.setFeedPostsList(response.data);
        } catch (e) {
            console.log(e);
            //throw Error(e.response.data.message);
        }
    }

    async deletePost (id) {
        try {
            const response = await PostService.deletePost(id);
            this.deleteFromFeedPostsList(response.data);
        } catch (e) {
            console.log(e);
            //throw Error(e.response.data.message);
        }
    }

    async deleteComment (id) {
        try {
            const response = await PostService.deletePost(id);
            this.deleteFromCurrentCommentsList(response.data);
        } catch (e) {
            console.log(e);
            //throw Error(e.response.data.message);
        }
    }

    async likePost (id) {
        try {
            const response = await PostService.like(id);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async unlikePost (id) {
        try {
            const response = await PostService.unlike(id);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async getUserPosts (id) {
        try {
            const {data} = await PostService.getUserPosts(id);
            // this.setCanLoadMore(data.canLoadMore)
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    async loadMoreUserPosts (userId, fromPost) {
        try {
            const {data} = await PostService.loadMoreUserPosts(
                userId,
                {
                    fromTimestamp : fromPost?.createdAt.timestamp || 0,
                    fromId : fromPost?.id || 0
                }
            );
            // this.setCanLoadMore(data.canLoadMore)
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    async syncUserPosts (userId, fromPost) {
        try {
            this.setSyncing(true);
            const {data} = await PostService.syncUserPosts(
                userId,
                {
                    fromTimestamp : fromPost?.createdAt.timestamp || 0,
                    fromId : fromPost?.id || 0
                }
            ); 
            
            this.setSyncing(false);
            return data;
        } catch (e) {
            this.setSyncing(false);
            console.log(e);
        }
    }
}