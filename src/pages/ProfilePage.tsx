import React from 'react';
import { useParams } from 'react-router-dom';
import { Users, MapPin, Link as LinkIcon, Twitter, Mail, Star, GitFork } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_USERS, MOCK_REPOS, generateContributionData } from '@shared/mock-data';
import { cn } from '@/lib/utils';
export function ProfilePage() {
  const { username } = useParams();
  const user = MOCK_USERS.find(u => u.id === username) || MOCK_USERS[0];
  const contributions = generateContributionData();
  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted dark:bg-muted/20';
    if (count === 1) return 'bg-green-100 dark:bg-green-900/30';
    if (count === 2) return 'bg-green-300 dark:bg-green-700/50';
    if (count === 3) return 'bg-green-500 dark:bg-green-500/70';
    return 'bg-green-700 dark:bg-green-300/90';
  };
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 space-y-4">
            <Avatar className="w-64 h-64 border-2 rounded-full overflow-hidden">
              <AvatarImage src={`https://github.com/${user.id}.png`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-xl text-muted-foreground">{user.id}</p>
            </div>
            <p className="text-sm">Building the future of Git collaboration at Forge. 🚀</p>
            <Button className="w-full" variant="outline">Edit profile</Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <Users className="w-4 h-4" />
              <span className="font-semibold text-foreground">1.2k</span> followers
              <span>·</span>
              <span className="font-semibold text-foreground">45</span> following
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground mt-4">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA</li>
              <li className="flex items-center gap-2"><LinkIcon className="w-4 h-4" /> forge.git</li>
              <li className="flex items-center gap-2"><Twitter className="w-4 h-4" /> @forge_git</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user.id}@example.com</li>
            </ul>
          </div>
          {/* Main Area */}
          <div className="flex-1 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Pinned</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_REPOS.slice(0, 4).map(repo => (
                  <Card key={repo.id} className="shadow-none">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        <Star className="w-3 h-3 inline mr-1" />
                        {repo.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{repo.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          {repo.language}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stars}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-base font-semibold mb-4">1,432 contributions in the last year</h2>
              <Card className="shadow-none">
                <CardContent className="p-4 overflow-x-auto">
                  <div className="flex gap-1 min-w-[700px]">
                    {Array.from({ length: 52 }).map((_, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-1">
                        {contributions.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day, dayIdx) => (
                          <div
                            key={day.date}
                            title={`${day.count} contributions on ${day.date}`}
                            className={cn("w-3 h-3 rounded-sm", getColor(day.count))}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 text-[10px] text-muted-foreground px-1">
                    <span>Learn how we count contributions</span>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 bg-muted rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-green-100 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-green-300 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-green-700 rounded-sm" />
                      <span>More</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}