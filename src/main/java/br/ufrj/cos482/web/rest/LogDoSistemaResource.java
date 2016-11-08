package br.ufrj.cos482.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufrj.cos482.service.LogDoSistemaService;
import br.ufrj.cos482.web.rest.util.HeaderUtil;
import br.ufrj.cos482.service.dto.LogDoSistemaDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing LogDoSistema.
 */
@RestController
@RequestMapping("/api")
public class LogDoSistemaResource {

    private final Logger log = LoggerFactory.getLogger(LogDoSistemaResource.class);
        
    @Inject
    private LogDoSistemaService logDoSistemaService;

    /**
     * POST  /log-do-sistemas : Create a new logDoSistema.
     *
     * @param logDoSistemaDTO the logDoSistemaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new logDoSistemaDTO, or with status 400 (Bad Request) if the logDoSistema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/log-do-sistemas",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<LogDoSistemaDTO> createLogDoSistema(@RequestBody LogDoSistemaDTO logDoSistemaDTO) throws URISyntaxException {
        log.debug("REST request to save LogDoSistema : {}", logDoSistemaDTO);
        if (logDoSistemaDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("logDoSistema", "idexists", "A new logDoSistema cannot already have an ID")).body(null);
        }
        LogDoSistemaDTO result = logDoSistemaService.save(logDoSistemaDTO);
        return ResponseEntity.created(new URI("/api/log-do-sistemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("logDoSistema", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /log-do-sistemas : Updates an existing logDoSistema.
     *
     * @param logDoSistemaDTO the logDoSistemaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated logDoSistemaDTO,
     * or with status 400 (Bad Request) if the logDoSistemaDTO is not valid,
     * or with status 500 (Internal Server Error) if the logDoSistemaDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/log-do-sistemas",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<LogDoSistemaDTO> updateLogDoSistema(@RequestBody LogDoSistemaDTO logDoSistemaDTO) throws URISyntaxException {
        log.debug("REST request to update LogDoSistema : {}", logDoSistemaDTO);
        if (logDoSistemaDTO.getId() == null) {
            return createLogDoSistema(logDoSistemaDTO);
        }
        LogDoSistemaDTO result = logDoSistemaService.save(logDoSistemaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("logDoSistema", logDoSistemaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /log-do-sistemas : get all the logDoSistemas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of logDoSistemas in body
     */
    @RequestMapping(value = "/log-do-sistemas",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<LogDoSistemaDTO> getAllLogDoSistemas() {
        log.debug("REST request to get all LogDoSistemas");
        return logDoSistemaService.findAll();
    }

    /**
     * GET  /log-do-sistemas/:id : get the "id" logDoSistema.
     *
     * @param id the id of the logDoSistemaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the logDoSistemaDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/log-do-sistemas/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<LogDoSistemaDTO> getLogDoSistema(@PathVariable Long id) {
        log.debug("REST request to get LogDoSistema : {}", id);
        LogDoSistemaDTO logDoSistemaDTO = logDoSistemaService.findOne(id);
        return Optional.ofNullable(logDoSistemaDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /log-do-sistemas/:id : delete the "id" logDoSistema.
     *
     * @param id the id of the logDoSistemaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/log-do-sistemas/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteLogDoSistema(@PathVariable Long id) {
        log.debug("REST request to delete LogDoSistema : {}", id);
        logDoSistemaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("logDoSistema", id.toString())).build();
    }

}
