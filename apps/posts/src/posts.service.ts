import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  create(createPostInput: CreatePostInput) {
    this.posts.push(createPostInput);
    return createPostInput;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: string) {
    return this.posts.find((post) => post.id === id);
  }

  update(id: string, updatePostInput: UpdatePostInput) {
    try {
      const existingPostIndex = this.posts.findIndex((post) => post.id === id);

      if (existingPostIndex === -1) {
        throw new NotFoundException('Post not found');
      }

      const post = this.posts[existingPostIndex];
      const updatedPost = {
        ...post,
        body: updatePostInput.body,
      };

      console.warn('updatedPost', updatedPost);
      this.posts[existingPostIndex] = updatedPost;

      return updatePostInput;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(
        `Failed to update post with id ${id}; payload ${JSON.stringify(
          updatePostInput,
        )}`,
      );
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  remove(id: string) {
    try {
      const existingPostIndex = this.posts.findIndex((post) => post.id === id);

      if (existingPostIndex === -1) {
        throw new NotFoundException('Post not found');
      }

      const filteredPosts = this.posts.filter((post) => post.id !== id);
      this.posts = filteredPosts;

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      console.error(`Failed to update post with id ${id}`);
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  forAuthor(userId: string) {
    return this.posts.filter((post) => post.userId === userId);
  }
}
