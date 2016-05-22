|      |            |
|------|------------|
|Group | BussInfraManDevOps (TSE One) |
|Assignment|Sprint 3|
|Date|22/05/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 3.

Total: **7.95**

| User Story | Score |
|------------|-------|
| definition |  10    |
| splitting  |  10    |
| responsibility | 10  |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |  10  |
| prioritisation        |  8   |
| reflection            |  3    |

## Notes
* Clear point system
* To me it seems you are missing the real data to the extent that it's hard to continue forward without it
* GH-Torrent and associated topics should be in the problems.
* Poor reflection. In meetings you explain more; you take the time to motivate decesions and explain problems. Here write it and explain it in that way. You have to document things like the dummy data starting to be a bottle-neck.

#Code Evolution Quality Feedback

Total: **5.34**

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |  6    |
| Architecture Design Document (ADD) |  8    |

|                     | Score |
|---------------------|-------|
| Code Change Quality | 7     |

| Code Readability | Score |
|------------------|-------|
| Formatting       |  10    |
| Naming           |  10    |
| Comments         |  5    |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |  10    |
| Testing                |  0    |

|         | Score |
|---------|-------|
| Tooling | 5     |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |  10    |
| Code Review            |  4    |

##Notes
* ADD
	* Mention the motivation documents you have written (jQuery, D3, )
	* More information for the specific subsystems of the Octopeer Viewer needed
		* I suggest a subsection for each of the follwoing: Analytics Interface, Services, API Caller
		* What does each subsystem do and what is it responsible for
	* Concurrency
		* The UI of the Viewer and the calling up of the data are likely concurrent processes, what do you use to make sure the UI doesn't lag when calling up large amount of data?
* Module_documentation
	* Excellent document to have, well explained and well motivated
	* I suggest using a table when describing the fields in `ajax` definition
* jQuery Motivation
	* Simply because it's popular doesn't make it a good choice
		* We're you familiar with it already, did you get a good recommendation for it, was it an arbitrary choice?
* Scrum Motivation - Good motivation
* OctopeerService
	* Contains dead code
* Services
	* These services seem to do very similar things, but there is no common interface or abstract class, why?
* Good that you separated the css, js, and html; nice job
* `script.TI2806.js` is empty?
* `apicallers`
	* GitHub and BitBucket are nearly identical
	* Octopeer is very similar to the other two
	* Why is there no common fuction call with parameters?
* `DummyCaller`
	* What is the purpose of this code, is it a dummy database?
		* If so, it's fine
		* Else, switch statement with a large amount of cases can be split into a class or function hierarchy
* `Settings`
	* Good that you moved these to a separate file
	* Is this supposed to be a singleton?
		* If so, then it currently isn't because it can be instantiated multiple times (JS is tricky like that)
		* Else, why isn't it? Seems like you only need one Settings object
* No extraneous comments, though I am missing out on what responsibilities go where. It's hard to read a file and understand what the code is for and what it's doing
* Seems like JavaScript has some limitations that in the SE aspects.
	* If so, please motivate your choice of JS over languages like TypeScript and others
* Can the repo be cleaned up into a folder hierarchy because the long list of files isn't making it easier to understand what's going on.
* Testing for this version was low, looking forward to awarding more points for the next sprint
* Need some more insight into you're reviewing process. If you don't write it, there's no proof for me that you did it