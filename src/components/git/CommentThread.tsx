import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MarkdownViewer } from '@/components/MarkdownViewer';
import { MOCK_USERS } from '@shared/mock-data';
import { IssueComment } from '@shared/types';
import { formatDistanceToNow } from 'date-fns';
import { Smile, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
interface CommentThreadProps {
  originalPost?: string;
  authorId: string;
  createdAt: string;
  comments: IssueComment[];
}
export function CommentThread({ originalPost, authorId, createdAt, comments }: CommentThreadProps) {
  const author = MOCK_USERS.find(u => u.id === authorId);
  return (
    <div className="space-y-8 relative">
      {/* Visual Timeline Line */}
      <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-border -z-10 hidden sm:block" />
      {/* Original Post */}
      <div className="flex gap-4">
        <Avatar className="h-8 w-8 border shadow-sm flex-shrink-0 z-10">
          <AvatarImage src={author?.avatar} />
          <AvatarFallback>{author?.username?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="bg-muted/30 px-4 py-2 flex items-center justify-between border-b">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{author?.username}</span>
              <span className="text-muted-foreground text-xs">commented {formatDistanceToNow(new Date(createdAt))} ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Smile className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="p-4 bg-card/50">
            {originalPost ? <MarkdownViewer content={originalPost} /> : <p className="text-sm text-muted-foreground italic">No description provided.</p>}
          </div>
        </div>
      </div>
      {/* Comments List */}
      {comments.map((comment) => {
        const commentAuthor = MOCK_USERS.find(u => u.id === comment.authorId);
        return (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
            <Avatar className="h-8 w-8 border shadow-sm flex-shrink-0 z-10">
              <AvatarImage src={commentAuthor?.avatar} />
              <AvatarFallback>{commentAuthor?.username?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 border rounded-xl bg-card overflow-hidden shadow-sm">
              <div className="bg-muted/30 px-4 py-2 flex items-center justify-between border-b">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">{commentAuthor?.username}</span>
                  <span className="text-muted-foreground text-xs">commented {formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><Smile className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="p-4">
                <MarkdownViewer content={comment.body} />
              </div>
            </div>
          </div>
        );
      })}
      {/* Reply Area */}
      <div className="flex gap-4 pt-4">
        <Avatar className="h-8 w-8 border shadow-sm flex-shrink-0 z-10 hidden sm:flex">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="flex-1 border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="bg-muted/30 px-4 py-2 border-b flex items-center gap-4">
             <span className="text-xs font-semibold text-muted-foreground">Write</span>
             <span className="text-xs text-muted-foreground/60 cursor-not-allowed">Preview</span>
          </div>
          <div className="p-2 space-y-2">
            <Textarea 
              placeholder="Leave a comment" 
              className="min-h-[120px] bg-muted/20 border-transparent focus:bg-background focus:border-border transition-all resize-y" 
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" className="text-xs">Attach files</Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-lg">Comment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}