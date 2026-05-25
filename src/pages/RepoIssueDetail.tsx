import React from 'react';
import { useParams } from 'react-router-dom';
import { CircleDot, Tag, Users, Milestone, Lock, Smile, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MOCK_ISSUES, MOCK_COMMENTS } from '@shared/mock-data';
import { cn } from '@/lib/utils';
import { MarkdownViewer } from '@/components/MarkdownViewer';
export function RepoIssueDetail() {
  const { issueId } = useParams();
  const issue = MOCK_ISSUES.find(i => i.id === issueId) || MOCK_ISSUES[0];
  const comments = MOCK_COMMENTS.filter(c => c.issueId === issue.id);
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-normal leading-tight">
            {issue.title} <span className="text-muted-foreground font-light ml-1">#{issue.id}</span>
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">New issue</Button>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap text-sm pb-6 border-b">
          <Badge className={cn("rounded-full px-3 py-0.5 text-white border-none", issue.status === 'open' ? "bg-green-600" : "bg-red-600")}>
            <CircleDot className="w-3 h-3 mr-1" /> {issue.status === 'open' ? 'Open' : 'Closed'}
          </Badge>
          <span className="font-bold text-muted-foreground">{issue.authorId}</span>
          <span className="text-muted-foreground">opened this issue on {new Date(issue.createdAt).toLocaleDateString()} · {issue.commentsCount} comments</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-9 space-y-8">
          <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-muted">
            <div className="flex gap-4 relative">
              <Avatar className="w-10 h-10 border z-10 bg-background">
                <AvatarImage src={`https://github.com/${issue.authorId}.png`} />
                <AvatarFallback>{issue.authorId[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 border rounded-lg overflow-hidden bg-card shadow-sm">
                <div className="bg-muted/30 px-4 py-2 border-b flex items-center justify-between">
                  <div className="text-xs font-semibold">
                    {issue.authorId} <span className="text-muted-foreground font-normal">commented {new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] text-muted-foreground px-1 h-4">Author</Badge>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <MarkdownViewer content="I've noticed we need a more robust way to navigate deeply nested file trees. Currently it only goes one level deep." />
                </div>
              </div>
            </div>
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 relative">
                <Avatar className="w-10 h-10 border z-10 bg-background">
                  <AvatarImage src={`https://github.com/${comment.authorId}.png`} />
                  <AvatarFallback>{comment.authorId[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 border rounded-lg overflow-hidden bg-card shadow-sm">
                  <div className="bg-muted/30 px-4 py-2 border-b flex items-center justify-between">
                    <div className="text-xs font-semibold">
                      {comment.authorId} <span className="text-muted-foreground font-normal">commented {new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <MarkdownViewer content={comment.content} />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-4 relative">
              <Avatar className="w-10 h-10 border z-10 bg-background">
                <AvatarImage src="https://github.com/forge-dev.png" />
                <AvatarFallback>FD</AvatarFallback>
              </Avatar>
              <div className="flex-1 border rounded-lg overflow-hidden bg-card shadow-sm">
                <div className="bg-muted/30 px-4 py-2 border-b flex items-center gap-4 text-xs font-semibold">
                  <span className="border-b-2 border-orange-500 pb-2 -mb-2 text-foreground">Write</span>
                  <span className="text-muted-foreground hover:text-foreground cursor-pointer pb-2 -mb-2">Preview</span>
                </div>
                <div className="p-2">
                  <textarea
                    className="w-full min-h-[120px] p-2 bg-secondary/30 rounded border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Leave a comment"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Smile className="w-3 h-3" /> Markdown is supported
                    </span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-medium">Comment</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground flex items-center justify-between mb-2 uppercase tracking-wider">
              Assignees <Users className="w-3 h-3" />
            </h4>
            <div className="text-xs text-muted-foreground italic">No one assigned</div>
          </div>
          <Separator />
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground flex items-center justify-between mb-2 uppercase tracking-wider">
              Labels <Tag className="w-3 h-3" />
            </h4>
            <div className="flex flex-wrap gap-1">
              {issue.labels.map(l => (
                <Badge key={l.name} variant="outline" className={cn("text-[10px] py-0 font-normal", l.color)}>{l.name}</Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground flex items-center justify-between mb-2 uppercase tracking-wider">
              Milestone <Milestone className="w-3 h-3" />
            </h4>
            <div className="text-xs text-muted-foreground italic">No milestone</div>
          </div>
          <Separator />
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer transition-colors">
              <Lock className="w-3 h-3" /> Lock conversation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}