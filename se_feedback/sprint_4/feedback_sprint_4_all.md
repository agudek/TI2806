|      |            |
|------|------------|
|Group | BussInfraManDevOps (TSE One) |
|Assignment|Sprint 4|
|Date|22/05/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 4.

Total: **9**

| User Story | Score |
|------------|-------|
| definition |  10    |
| splitting  |  7    |
| responsibility | 10  |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |  10  |
| prioritisation        |  8   |
| reflection            |  9    |

## Notes
* Well done this Sprint
* I am mildly concerned about the number of hours each member is contributing
	* There's a 12 hour difference between the most and least
	* The Git commit graphs look reasonably similar
	* I'd like to know why the difference is so big in the reflection (as a note if it's not a problem)

#Code Evolution Quality Feedback

Total: **6.05**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |  7    |
| Architecture Design Document (ADD) |  8    |

|                     | Score |
|---------------------|-------|
| Code Change Quality | 8     |

| Code Readability | Score |
|------------------|-------|
| Formatting       |  10    |
| Naming           |  9    |
| Comments         |  8    |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |  10    |
| Testing                |  1    |

|         | Score |
|---------|-------|
| Tooling | 8     |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |  10   |
| Code Review            |  4    |

##Notes
* ADD
	* Mention the motivation documents you have written (jQuery, D3, etc)
	* Concurrency
		* This is where you handle anything about RSVP and Promises, not in the subsystem part
* Promise documentation
	* Good that you added this document
	* Explain some more about callback hell because this is the problem you're solving with RSVP
* Visualisation documentation
	* Good that you added this document
	* Don't make statements like "Generally, a higher amount of comments describes a better quality of peer reviewing" unless you have a scientifically valid reference
	* Don't draw conclusions about the peer-reviewing process, that's why Octopeer is being made. Focus on why you think a certain visualisation will provide more insight
	* There's a data visualisation course (MSc) given in Q2. Try enrolling on Blackboard and look through their slides for more ideas
* Much cleaner repo than Sprint 3! Can you clean it up even further?
* `script.TI2806.js` is no longer empty
	* It's unclear to me what this code is used for
	* Is it to provide utility functionality?
		* If so, it needs to be renamed and maybe split up
* `cache`
	* Please don't use cash where you mean cache 
* Good job splitting the services and APIs!
	* Common or very similar code that could be merged
	* No common hierarchy thus it would be hard to add a 3rd service (like GitLab)
* Better quality comments
* Testing for this version was low, looking forward to awarding more points for the next sprint
* Need some more insight into you're reviewing process. If you don't write it, there's no proof for me that you did it. You're making a tool to visualise data on the pr review process. Start doing a good pr review process; it will give you more insight into what data you need and what you want to visualise.