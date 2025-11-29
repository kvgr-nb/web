# 初始化Git仓库（若未初始化）
git init
# 添加所有文件到暂存区
git add .
# 提交代码
git commit -m "首次提交：部署静态项目"
# 关联远程GitHub仓库（替换为你的仓库HTTPS/SSH地址）
git remote add origin https://github.com/你的用户名/你的仓库名.git
# 推送到main分支（GitHub默认分支名是main，若为master需替换）
git push -u origin main
